import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    if (this.socket?.connected) return this.socket;

    const BACKEND_URL = 'https://annoymeet.onrender.com';
    console.log('🛰️ Connecting to Socket.IO backend at:', BACKEND_URL);

    this.socket = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to Socket.IO server');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.warn('⚠️ Disconnected from Socket.IO server:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message || error);
      this.handleReconnect();
    });

    return this.socket;
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`🔄 Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

      setTimeout(() => {
        this.connect();
      }, 1000 * this.reconnectAttempts);
    } else {
      console.error('❌ Max reconnect attempts reached. Giving up.');
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

  joinRoom(roomId, userId, anonymousId) {
    this.socket?.emit('join_room', { roomId, userId, anonymousId });
  }

  leaveRoom(roomId, userId, anonymousId) {
    this.socket?.emit('leave_room', { roomId, userId, anonymousId });
  }

  sendMessage(roomId, userId, content, anonymousId, replyTo = null) {
    this.socket?.emit('send_message', { roomId, userId, content, anonymousId, replyTo });
  }

  addReaction(roomId, messageId, userId, reactionType, anonymousId) {
    this.socket?.emit('add_reaction', { roomId, messageId, userId, reactionType, anonymousId });
  }

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
