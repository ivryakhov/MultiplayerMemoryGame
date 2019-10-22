using System;

namespace GameModel
{
    public class Card
    {
        public string FrontValue { get; private set; }
        public int Index { get; private set; }
        public bool IsClosed { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsMatched { get; set; }
        public string Id { get; set; }

        public Card(string frontValue, int index)
        {
            FrontValue = frontValue;
            Index = index;
            IsClosed = true;
            IsDisabled = false;
            IsMatched = false;
            Id = Guid.NewGuid().ToString();
        }
    }
}
