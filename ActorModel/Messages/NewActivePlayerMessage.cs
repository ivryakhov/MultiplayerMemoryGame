using GameModel;

namespace ActorModel.Messages
{
    class NewActivePlayerMessage
    {
        public Player Player { get; private set; }

        public NewActivePlayerMessage(Player player)
        {
            Player = player;
        }
    }
}
