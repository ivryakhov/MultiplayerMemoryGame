using System.Collections.Generic;

namespace ActorModel.Messages
{
    public class PlayersListProvidedMessage : IActorMessage
    {
        public IList<string> PlayersList;
        public string ConnectionId { get; set; }

        public PlayersListProvidedMessage(IList<string> players, string connectionId)
        {
            PlayersList = players;
            ConnectionId = connectionId;
        }
    }
}
