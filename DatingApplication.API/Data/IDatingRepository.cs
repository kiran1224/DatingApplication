using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApplication.API.Models;

namespace DatingApplication.API.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T: class;

         void Delete<T>(T entity) where T: class;

         Task<bool> Savell();

         Task<IEnumerable<User>> GetUsers();

         Task<User> GetUser(int id);

        Task<Photo> GetMainPhotoForUser(int userId);
         Task<Photo> GetPhoto(int id);
         
    }
}