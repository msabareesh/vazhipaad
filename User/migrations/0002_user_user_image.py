# Generated by Django 3.0.6 on 2020-07-19 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_image',
            field=models.ImageField(blank=True, null=True, upload_to='pics', verbose_name='IMAGE'),
        ),
    ]
