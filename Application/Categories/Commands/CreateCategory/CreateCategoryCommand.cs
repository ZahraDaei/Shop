using MediatR;
using Microsoft.AspNetCore.Http;
using Store.Common.Interfaces;
using Store.Models;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Store.Application.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommand : IRequest<long>
    {
        public string Name { get; set; }
        public string FarsiName { get; set; }
        //public string Image { get; set; }
        public IFormFile ImageContent { get; set; }
        public long ParentId { get; set; }
        public List<string> Specifications { get; set; }
    }

    public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, long>
    {
        private readonly IApplicationDbContext _context;

        public CreateCategoryCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<long> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            try
            {

           
            var entity = new Models.Category();

            entity.FarsiName = request.FarsiName;
            entity.Image = request.ImageContent.FileName;
            entity.Name = request.Name;
            entity.ParentId = request.ParentId;
            using (var memoryStream = new MemoryStream())
            {
                await request.ImageContent.CopyToAsync(memoryStream);

                if (memoryStream.Length < 100000)
                {
                    entity.Content = memoryStream.ToArray();
                }
            }

            _context.Categories.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            if (request.Specifications!= null)
            {
                for (int i = 0; i < request.Specifications.Count; i++)
                {
                    var item = request.Specifications[i];
                    var specs = new Specification()
                    {
                        CategoryId = entity.Id,
                        SpecificationKey = item,

                    };
                    _context.Specifications.Add(specs);
                }
            }
            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
            }
            catch (System.Exception e)
            {

                throw;
            }
        }
    }
}

