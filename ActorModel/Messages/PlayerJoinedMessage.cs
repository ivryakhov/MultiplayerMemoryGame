using GameModel;

namespace ActorModel.Messages
{   
    public class PlayerJoinedMessage
    {
        public Player Player { get; private set; }

        public PlayerJoinedMessage(Player player)
        {
            Player = player;
        }
    }
}
