# ecommerce/management/commands/add_products.py
from django.core.management.base import BaseCommand
from store.models import Category, Product

class Command(BaseCommand):
    help = 'Adds initial products to the database'

    def handle(self, *args, **kwargs):
        # Define your products
        products = [
            {
                'name': 'Bag',
                'description': 'A stylish and durable bag.',
                'image': 'products/bag.jpg',
                'price': 49.99,
                'category': 'Bags',
                'stock': 100
            },
            {
                'name': 'Shoes',
                'description': 'Comfortable running shoes.',
                'image': 'products/shoes.jpg',
                'price': 79.99,
                'category': 'Footwear',
                'stock': 50
            },
            {
                'name': 'Watch',
                'description': 'A sleek and modern watch.',
                'image': 'products/watch.jpg',
                'price': 199.99,
                'category': 'Accessories',
                'stock': 75
            }
        ]

        # Iterate over products and create them if they don't exist
        for product_data in products:
            category, _ = Category.objects.get_or_create(name=product_data['category'])
            
            if not Product.objects.filter(name=product_data['name']).exists():
                Product.objects.create(
                    name=product_data['name'],
                    description=product_data['description'],
                    image=product_data['image'],
                    price=product_data['price'],
                    category=category,
                    stock=product_data['stock']
                )

        self.stdout.write(self.style.SUCCESS('Products added successfully!'))
