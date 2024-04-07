"""makes stars nullable in review table

Revision ID: 2ca2b9c23be7
Revises: 0d3e35be75c2
Create Date: 2024-04-07 13:46:11.445693

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2ca2b9c23be7'
down_revision = '0d3e35be75c2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('stars',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('stars',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
