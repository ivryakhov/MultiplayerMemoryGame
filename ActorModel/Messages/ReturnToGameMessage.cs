namespace ActorModel.Messages
{
    public class ReturnToGameMessage : IActorMessage
    {
        public string PlayerName { get; private set; }
        public string ConnectionId { get; private set; }

        public ReturnToGameMessage(string playerName, string connectionId)
        {
            PlayerName = playerName;
            ConnectionId = connectionId;
        }
    }
}
