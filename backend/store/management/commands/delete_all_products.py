from django.core.management.base import BaseCommand
from store.models import Product

class Command(BaseCommand):
    help = 'Deletes all products from the database'

    def handle(self, *args, **kwargs):
        Product.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('All products have been deleted successfully!'))
