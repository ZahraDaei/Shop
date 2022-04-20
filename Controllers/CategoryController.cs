using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Store.Application.Categories.Commands.CreateCategory;
using Store.Application.Categories.Queries.GetCategory;
using Store.Common.Interfaces;
using Store.ModelDTO;
using Store.Models;
using Store.ModelVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ApiControllerBase
    {


        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CategoryController(ILogger<WeatherForecastController> logger, IApplicationDbContext context, IMapper mapper)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("getCategoryTree")]
        public async Task<string> Get()
        {
            return await Mediator.Send(new GetCategoriesTreeQuery());

        }
        [HttpGet("getCategory")]
        public async Task<CategoryVm> GetCategoryList()
        {
            return await Mediator.Send(new GetCategoryListQuery());

        }
        [HttpPost]
        public async Task<ActionResult<long>> Create([FromForm] CreateCategoryCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
