using Akka.Actor;
using ActorModel.Messages;

namespace ActorModel.Actors
{
    public class PlayerActor : ReceiveActor
    {
        private readonly string _playerName;
        
        public PlayerActor(string playerName, string connectionId)
        {
            _playerName = playerName;

            Receive<RefreshPlayerStatusMessage>(
                message =>
                {
                    Sender.Tell(new PlayerStatusMessage(_playerName));
                });            
        }
    }
}