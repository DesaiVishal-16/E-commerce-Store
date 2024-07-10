from django.urls import path,include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from store.views import SignUpView, LoginView, ProductList, ProductDetail

urlpatterns = [
    path('admin/', admin.site.urls),  
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('products/', ProductList.as_view(), name='products'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


