using Akka.Actor;
using ActorModel.Messages;

namespace ActorModel.Actors
{
    public class PlayerActor : ReceiveActor
    {
        private readonly string _playerName;
        public string ConnectionId { get; private set; }

        public PlayerActor(string playerName, string connectionId)
        {
            _playerName = playerName;
            ConnectionId = connectionId;

            Receive<RefreshPlayerStatusMessage>(
                message =>
                {
                    Sender.Tell(new PlayerStatusMessage(_playerName));
                });            
        }
    }
}