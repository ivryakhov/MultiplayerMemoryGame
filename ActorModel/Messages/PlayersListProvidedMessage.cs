using System.Collections.Generic;

namespace ActorModel.Messages
{
    public class PlayersListProvidedMessage : IActorMessage
    {
        public IList<string> PlayersList { get; private set; }
        public string ConnectionId { get; private set; }

        public PlayersListProvidedMessage(IList<string> players, string connectionId)
        {
            PlayersList = players;
            ConnectionId = connectionId;
        }
    }
}
