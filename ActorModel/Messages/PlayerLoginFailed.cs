namespace ActorModel.Messages
{
    public class PlayerLoginFailed
    {
        public string ErrorMessage { get; private set; }
        public string ConnectionId { get; private set; }

        public PlayerLoginFailed(string errorMessage, string connectionId)
        {
            ErrorMessage = errorMessage;
            ConnectionId = connectionId;
        }
    }
}
