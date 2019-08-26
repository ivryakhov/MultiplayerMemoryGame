using System;
namespace ActorModel.Messages
{
    class PlayerStatusMessage
    {
        public string PlayerName { get; private set; }

        public PlayerStatusMessage(string playerName)
        {
            PlayerName = playerName;
        }
    }
}
