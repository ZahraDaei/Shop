using AutoMapper;
using MediatR;
using Shop.Application.Common.Exceptions;
using Shop.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.Users.Queries.GetUser
{

    public class GetUserQuery : IRequest<UserVm>
    {
    }

    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, UserVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IIdentityService _identityService;
        private readonly ICurrentUserService _currentUserService;

        public GetUserQueryHandler(IApplicationDbContext context, IMapper mapper,
            IIdentityService identityService,
            ICurrentUserService currentUserService
)
        {
            _context = context;
            _mapper = mapper;
            _identityService = identityService;
            _currentUserService = currentUserService;
        }

        public async Task<UserVm> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            try
            {
                if (_currentUserService.UserId==null)
                {
                    throw new NotFoundException();
                }
                var user = await _identityService.GetUserAsync(_currentUserService.UserId);
                               
               return new UserVm() { UserDto = user };
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}

