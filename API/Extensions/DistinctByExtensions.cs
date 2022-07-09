using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Extensions
{
    public static class DistinctByExtensions
    {
        public class LambdaEqualityComparer<TSource, TDest> :
          IEqualityComparer<TSource>
        {
            private Func<TSource, TDest> _selector;

            public LambdaEqualityComparer(Func<TSource, TDest> selector)
            {
                _selector = selector;
            }

            public bool Equals(TSource obj, TSource other)
            {
                return _selector(obj).Equals(_selector(other));
            }

            public int GetHashCode(TSource obj)
            {
                return _selector(obj).GetHashCode();
            }
        }

        public static IEnumerable<TSource> DistinctBy<TSource, TCompare>(
    this IEnumerable<TSource> source, Func<TSource, TCompare> selector)
        {
            return source.Distinct(new LambdaEqualityComparer<TSource, TCompare>(selector));
        }
    }
}