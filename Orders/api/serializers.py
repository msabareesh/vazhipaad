from rest_framework import serializers
from Orders.models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'customer',
            'date_ordered',
            'complete',
        ]
