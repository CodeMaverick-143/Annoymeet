import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(import.meta.env.VITE_BACKEND_URL || 'https://annoymeet.onrender.com', {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true
    });

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from Socket.IO server:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.handleReconnect();
    });

    return this.socket;
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect();
      }, 1000 * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }

  // Room methods
  joinRoom(roomId, userId, anonymousId) {
    this.socket?.emit('join_room', { roomId, userId, anonymousId });
  }

  leaveRoom(roomId, userId, anonymousId) {
    this.socket?.emit('leave_room', { roomId, userId, anonymousId });
  }

  // Message methods
  sendMessage(roomId, userId, content, anonymousId, replyTo) {
    this.socket?.emit('send_message', { roomId, userId, content, anonymousId, replyTo });
  }

  addReaction(roomId, messageId, userId, reactionType, anonymousId) {
    this.socket?.emit('add_reaction', { roomId, messageId, userId, reactionType, anonymousId });
  }

  // Poll methods
  createPoll(roomId, userId, question, pollType, options, anonymousId) {
    this.socket?.emit('create_poll', { roomId, userId, question, pollType, options, anonymousId });
  }

  votePoll(roomId, pollId, userId, optionIndex, anonymousId) {
    this.socket?.emit('vote_poll', { roomId, pollId, userId, optionIndex, anonymousId });
  }

  endPoll(roomId, pollId, userId) {
    this.socket?.emit('end_poll', { roomId, pollId, userId });
  }
}

export const socketService = new SocketService();
