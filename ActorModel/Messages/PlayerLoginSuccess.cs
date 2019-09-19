using System;
using System.Collections.Generic;
using System.Text;

namespace ActorModel.Messages
{
    public class PlayerLoginSuccess : IActorMessage
    {
        public string PlayerName { get; private set; }
        public string ConnectionId { get; private set; }

        public PlayerLoginSuccess(string playerName, string connectionId)
        {
            PlayerName = playerName;
            ConnectionId = connectionId;
        }
    }
}
