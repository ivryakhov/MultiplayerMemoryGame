using GameModel;

namespace ActorModel.Messages
{
    public class BoardStateProvidedMessage : IActorMessage
    {
        public Board Board { get; private set; }
        public string ConnectionId { get; private set; }

        public BoardStateProvidedMessage(Board board, string connectionId)
        {
            Board = board;
            ConnectionId = connectionId;
        }
    }
}
