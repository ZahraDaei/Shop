using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
       // private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProductController(ILogger<ProductController> logger,
            //IApplicationDbContext context,
            IMapper mapper)
        {
            _logger = logger;
          //  _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ProductVm> Get()
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
