using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Shop.Application.ProductCategories.Queries.GetProductCategory;
using Shop.Application.Products.Commands.CreateProduct;
using Shop.Application.Products.Queries.GetProductList;
using System.Threading.Tasks;

namespace Shop.WebUI.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ApiControllerBase
    {


        private readonly ILogger<ProductController> _logger;
        private readonly IMapper _mapper;

        public ProductController(ILogger<ProductController> logger,
            IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("GetProductCategoryList")]
        public async Task<ProductCategoryVm> GetProductCategoryList()
        {

            return await Mediator.Send(new GetProductCategoryListQuery());

        }
        
        [HttpGet("ProductList")]
        public async Task<ProductVm> Getlist()
        {

            return await Mediator.Send(new GetProductListQuery());

        }

        [HttpPost]
        public async Task<ActionResult<long>> Create([FromForm] CreateProductCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
