"""adds image to artist table

Revision ID: f4698cc0d026
Revises: 989d7f55b523
Create Date: 2024-04-08 10:52:25.869380

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f4698cc0d026'
down_revision = '989d7f55b523'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('artists', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_image', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('artists', schema=None) as batch_op:
        batch_op.drop_column('profile_image')

    # ### end Alembic commands ###
