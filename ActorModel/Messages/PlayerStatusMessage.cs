namespace ActorModel.Messages
{
    class PlayerStatusMessage : IActorMessage
    {
        public string PlayerName { get; private set; }

        public PlayerStatusMessage(string playerName)
        {
            PlayerName = playerName;
        }
    }
}
