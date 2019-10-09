using System.Collections.Generic;

namespace GameModel
{
    class CircularList<T> : List<T>
    {
        private int _currentIndex = 0;

        public T GetNext()
        {
            if (Count == 0)
                return default;
            if (_currentIndex < Count - 1)
            {
                _currentIndex++;                
            }
            else
            {
                _currentIndex = 0;

            }
            return this[_currentIndex];
        }
    }
}
