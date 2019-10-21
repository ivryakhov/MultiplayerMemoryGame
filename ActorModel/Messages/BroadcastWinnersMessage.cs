using GameModel;
using System.Collections.Generic;

namespace ActorModel.Messages
{
    public class BroadcastWinnersMessage
    {
        public IList<Player> Winners { get; set; }

        public BroadcastWinnersMessage(IList<Player> winners)
        {
            Winners = winners;
        }
    }
}
