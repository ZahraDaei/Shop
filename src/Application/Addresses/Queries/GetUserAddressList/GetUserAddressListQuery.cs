using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Shop.Application.Common.Exceptions;
using Shop.Application.Common.Interfaces;
using Shop.Application.Users.Queries.GetUser;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.Addressess.Queries.GetUserAddressList
{

    public class GetUserAddressListQuery : IRequest<UserAddressListVm>
    {
    }

    public class GetUserAddressListQueryHandler : IRequestHandler<GetUserAddressListQuery, UserAddressListVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IIdentityService _identityService;
        private readonly ICurrentUserService _currentUserService;

        public GetUserAddressListQueryHandler(IApplicationDbContext context, IMapper mapper,
            IIdentityService identityService,
            ICurrentUserService currentUserService
)
        {
            _context = context;
            _mapper = mapper;
            _identityService = identityService;
            _currentUserService = currentUserService;
        }

        public async Task<UserAddressListVm> Handle(GetUserAddressListQuery request, CancellationToken cancellationToken)
        {
            try
            {
                if (_currentUserService.UserId == null)
                {
                    throw new NotFoundException();
                }
                var addressList = await _context.Addresses
                    .Where(a => a.ApplicationUserId == _currentUserService.UserId)
                    .ProjectTo<UserAddressListDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return new UserAddressListVm() { UserAddressListDto = addressList };
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}

