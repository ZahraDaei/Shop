using Shop.Domain.Common;
using System.Threading.Tasks;

namespace Shop.Application.Common.Interfaces
{
    public interface IDomainEventService
    {
        Task Publish(DomainEvent domainEvent);
    }
}
