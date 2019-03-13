const { component, on } = capsid

@component('edit-chart-tooltip')
class EditChartTooltip {
  @on.click.at('.is-primary')
  onClickEdit () {
    console.log('EDIT')
  }

  @on.click.at('.is-danger')
  onClickDelete () {
    console.log('DELETE')
  }
}

module.exports = EditChartTooltip
