using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Shop.Application.Common.Exceptions;
using Shop.Application.Common.Interfaces;
using Shop.Domain.Entities;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommand : IRequest<long>
    {
        public string Name { get; set; }
        public string FarsiName { get; set; }
        public IFormFile ImageContent { get; set; }
        public long ParentId { get; set; }
        public string Specifications { get; set; }
    }

    public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, long>
    {
        private readonly IApplicationDbContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public CreateCategoryCommandHandler(IApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _hostingEnvironment = environment;
        }

        public async Task<long> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var category = await _context.Categories.FirstOrDefaultAsync(x => x.Name == request.Name);
                if (category != null)
                {
                    var err = new ValidationException();
                    err.Errors.Add("دسته بندی", new string[] { "تکراری" });
                    throw err;
                }
                string images = Path.Combine(_hostingEnvironment.WebRootPath, "images/category");
                var file = request.ImageContent;
                if (file.Length > 0)
                {
                    string filePath = Path.Combine(images, file.FileName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                }

                var entity = new Category();

                entity.FarsiName = request.FarsiName;
                entity.Image = request.ImageContent.FileName;
                entity.Name = request.Name;
                entity.ParentId = request.ParentId;
                //using (var memoryStream = new MemoryStream())
                //{
                //    await request.ImageContent.CopyToAsync(memoryStream);

                //    if (memoryStream.Length < 100000)
                //    {
                //        entity.Content = memoryStream.ToArray();
                //    }
                //}


                _context.Categories.Add(entity);
                await _context.SaveChangesAsync(cancellationToken);

                if (request.Specifications != null)
                {
                    string[] specs = request.Specifications.Split(",");
                    for (int i = 0; i < specs.Length; i++)
                    {
                        var item = specs[i];
                        var spec = new Specification()
                        {
                            CategoryId = entity.Id,
                            SpecificationKey = item,

                        };
                        _context.Specifications.Add(spec);
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

