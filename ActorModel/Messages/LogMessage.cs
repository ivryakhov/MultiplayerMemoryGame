namespace ActorModel.Messages
{  
    public class LogMessage
    {
        public string Message { get; private set; }

        public LogMessage (string message)
        {
            Message = message;
        }
    }
}
