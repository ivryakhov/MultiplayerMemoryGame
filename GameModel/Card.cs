namespace GameModel
{
    public class Card
    {
        public string FrontValue { get; private set; }
        public bool IsClosed { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsMatched { get; set; }

        public Card(string frontValue)
        {
            FrontValue = frontValue;
            IsClosed = true;
            IsDisabled = false;
            IsMatched = false;
        }
    }
}
