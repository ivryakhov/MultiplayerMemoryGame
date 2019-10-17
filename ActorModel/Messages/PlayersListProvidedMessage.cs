using System.Collections.Generic;
using GameModel;

namespace ActorModel.Messages
{
    public class PlayersListProvidedMessage
    {
        public IList<Player> PlayersList { get; private set; }
        public string ConnectionId { get; private set; }

        public PlayersListProvidedMessage(IList<Player> players, string connectionId)
        {
            PlayersList = players;
            ConnectionId = connectionId;
        }
    }
}
