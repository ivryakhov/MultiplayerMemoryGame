using System;
using System.Collections.Generic;
using System.Text;

namespace ActorModel.Messages
{   
    public class PlayerJoinedMessage
    {
        public string PlayerName { get; private set; }

        public PlayerJoinedMessage(string playerName)
        {
            PlayerName = playerName;
        }
    }
}
