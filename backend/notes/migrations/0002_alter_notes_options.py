# Generated by Django 4.1.4 on 2023-01-01 17:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notes',
            options={'ordering': ('-updated_at',)},
        ),
    ]
