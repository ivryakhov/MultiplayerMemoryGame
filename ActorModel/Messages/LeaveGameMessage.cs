namespace ActorModel.Messages
{
    public class LeaveGameMessage : IActorMessage
    {
        public string PlayerName { get; private set; }
        public string ConnectionId { get; private set; }

        public LeaveGameMessage(string playerName, string connectionId)
        {
            PlayerName = playerName;
            ConnectionId = connectionId;
        }
    }
}
