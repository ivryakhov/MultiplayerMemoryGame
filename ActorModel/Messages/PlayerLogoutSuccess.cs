namespace ActorModel.Messages
{
    class PlayerLogoutSuccess : IActorMessage
    {
        public string PlayerName { get; private set; }
        public string ConnectionId { get; private set; }

        public PlayerLogoutSuccess(string playerName, string connectionId)
        {
            PlayerName = playerName;
            ConnectionId = connectionId;
        }
    }
}
