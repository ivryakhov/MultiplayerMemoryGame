﻿namespace ActorModel.Messages
{
    public class JoinGameMessage : IActorMessage
    {
        public string PlayerName { get; private set; }
        public string ConnectionId { get; private set; }

        public JoinGameMessage(string playerName, string connectionId)
        {
            PlayerName = playerName;
            ConnectionId = connectionId;
        }
    }
}
