using System.Collections.Generic;
using GameModel;

namespace ActorModel.Messages
{
    public class BroadcastPlayersListMessage
    {
        public IList<Player> PlayersList { get; private set; }

        public BroadcastPlayersListMessage(IList<Player> players)
        {
            PlayersList = players;
        }
    }
}
