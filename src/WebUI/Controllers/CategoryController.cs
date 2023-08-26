using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Shop.Application.Categories.Commands.CreateCategory;
using Shop.Application.Categories.Queries.GetCategory;
using Shop.Application.Common.Interfaces;
using Shop.Application.Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.Application.Products.Commands.CreateProduct;

namespace Shop.WebUI.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ApiControllerBase
    {


        private readonly ILogger<CategoryController> _logger;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CategoryController(ILogger<CategoryController> logger, IApplicationDbContext context, IMapper mapper)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("getCategory")]
        public async Task<CategoryVm> GetCategoryList()
        {
            return await Mediator.Send(new GetCategoryListQuery());

        }
        [HttpGet("getCategoryTree")]
        public async Task<IEnumerable<TreeItem<CategoryDto>>> Get()
        {
            
            return await Mediator.Send(new GetCategoriesTreeQuery());

        }

        [HttpGet("GetCategoryById")]
        public async Task<CategoryDto> GetCategoryById(long id)
        {

            return await Mediator.Send(new GetCategoryByIdQuery() { CategoryId = id });

        }

        [HttpPost]
        public async Task<ActionResult<long>> Create([FromForm] CreateCategoryCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("UpdateCategory")]
        public async Task<ActionResult<long>> Update([FromForm] UpdateCategoryCommand command)
        {

            return await Mediator.Send(command);
        }

        [HttpDelete("DeleteCategory")]
        public async Task<ActionResult> SoftDelete(long id)
        {

            await Mediator.Send(new DeleteCategoryCommand() { Id = id });
            return NoContent();
        }
    }
}
