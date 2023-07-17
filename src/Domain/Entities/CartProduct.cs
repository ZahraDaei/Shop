namespace Shop.Domain.Entities
{
    public class CartProduct
    {
        public long Id { get; set; }
        public int Amount { get; set; }
        public long ProductId { get; set; }
        public Product Product { get; set; }
    }
}
