namespace ActorModel.Messages
{
    public class RequestBoardStateMessage : IActorMessage
    {
        public string ConnectionId { get; private set; }

        public RequestBoardStateMessage(string connectionId)
        {
            ConnectionId = connectionId;
        }
    }
}
