"""creates artist table

Revision ID: 68cc4d81dd4c
Revises: 
Create Date: 2024-04-05 09:43:16.419579

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '68cc4d81dd4c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('artists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('genre', sa.String(), nullable=True),
    sa.Column('tm_id', sa.Integer(), nullable=True),
    sa.Column('mbid', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('artists')
    # ### end Alembic commands ###
