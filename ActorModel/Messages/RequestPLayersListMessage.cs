namespace ActorModel.Messages
{
    public class RequestPlayersListMessage : IActorMessage
    {
        public string ConnectionId { get; private set; }

        public RequestPlayersListMessage(string connectionId)
        {
            ConnectionId = connectionId;
        }
    }
}
