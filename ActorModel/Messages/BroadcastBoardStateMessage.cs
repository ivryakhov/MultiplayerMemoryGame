using GameModel;

namespace ActorModel.Messages
{
    public class BroadcastBoardStateMessage
    {
        public Board Board { get; private set; }

        public BroadcastBoardStateMessage(Board board)
        {
            Board = board;
        }
    }
}
