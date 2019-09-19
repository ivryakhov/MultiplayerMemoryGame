namespace ActorModel.Messages
{
    public class RequestPlayersListMessage : IActorMessage
    {
        public string ConnectionId { get; set; }

        public RequestPlayersListMessage(string connectionId)
        {
            ConnectionId = connectionId;
        }
    }
}
