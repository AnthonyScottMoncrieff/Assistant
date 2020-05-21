using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Assistant.DataAccess.Extensions
{
    public static class DBSetExtensions
    {
        public static async Task<T> AddIfNotExists<T>(this DbSet<T> dbSet, T entity, Expression<Func<T, bool>> predicate = null) where T : class, new()
        {
            var exists = predicate != null ? dbSet.Any(predicate) : dbSet.Any();
            if (!exists)
                return (await dbSet.AddAsync(entity)).Entity;
            return await dbSet.FirstAsync(predicate);
        }
    }
}