<template>
  <el-table
    :data="table.data"
    v-loading="table.loading"
    :stripe="table.stripe"
    border
  >
    <template v-for="item in table.header">
      <!-- 操作 -->
      <template v-if="item.prop == 'options'">
        <template v-if="table.options.length">
          <el-table-column
            :label="item.label"
            :width="item.width"
            :fixed="item.fixed"
          >
            <template slot-scope="scope">
              <template v-for="btn in table.options">
                <!-- switch -->
                <template v-if="btn.type === 'switch'">
                  <el-switch
                    :value="btn.formatter(scope.row.online)"
                    @change="btn.event(scope.row)"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  >
                  </el-switch>
                </template>

                <template v-else>
                  <el-button
                    :type="btn.type"
                    v-if="btn.isShow ? btn.isShow(scope.row) : true"
                    @click="btn.event(scope.row)"
                    >{{ btn.label }}</el-button
                  >
                </template>
              </template>
            </template>
          </el-table-column>
        </template>
      </template>

      <template v-else>
        <!-- 图片 -->
        <template v-if="item.isImg">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          >
            <template slot-scope="scope">
              <el-popover placement="left" trigger="click">
                <div>
                  <el-image
                    style="width: 300px; height: auto;"
                    :src="scope.row[item.prop]"
                    fit="contain"
                    slot="reference"
                  ></el-image>
                </div>
                <el-image
                  style="width: 100px;height: 100px;"
                  :src="scope.row[item.prop]"
                  fit="contain"
                  slot="reference"
                ></el-image>
              </el-popover>
            </template>
          </el-table-column>
        </template>

        <!-- 标题 -->
        <template v-else-if="item.prop === 'tit'">
          <el-table-column prop="link tit" label="标题">
            <template slot-scope="scope">
              <a :href="scope.row.link" style="text-decoration: underline">{{
                scope.row.tit
              }}</a>
            </template>
          </el-table-column>
        </template>

        <!-- 其他 -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :show-overflow-tooltip="item.tooltip ? item.tooltip : false"
          :sortable="item.sortable ? item.sortable : false"
          v-else
          ><template slot-scope="scope">
            {{
              item.formatter
                ? item.formatter(scope.row[item.prop])
                : scope.row[item.prop]
            }}
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
</template>


<script>
export default {
  props: {
    table: Object
  },
  watch: {
    table: {
      immediate: true,
      handler(val) {
        console.log("val", val);
      }
    }
  }
};
</script>

