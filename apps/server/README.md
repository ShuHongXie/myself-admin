### 快捷命令指南

1. nest -h 查看命令帮助
2. nest g xxx [name] [path]生成命名为name值的文件/模块
3. 一次生成单个文件夹下的controller，service，module

```js
nest g res auth /modules
```

### nestjs

- 执行顺序：客户端请求 → 中间件 → 守卫（Guard） → 拦截器（进入前） → 控制器方法 → 拦截器（退出后） → 过滤器（Exception Filter） → 客户端响应

### 概念

1.  Entity: 数据库表的 “映射”，定义数据在数据库中的存储结构（字段名、类型、约束等）。
2.  Dto: 定义接口交互时的数据格式（请求参数 / 响应结果），用于数据验证和格式约束。
3.  Vo: 定义请求Response的格式

### 使用方法

```js
@OneToMany(
  type => TargetEntity,  // 目标实体类
  target => target.property,  // 目标实体中关联当前实体的属性
  options?: {  // 关系配置选项（可选）
    cascade?: boolean | ("insert" | "update" | "remove" | "soft-remove" | "recover")[];
    lazy?: boolean;
    eager?: boolean;
    nullable?: boolean;
    onDelete?: "RESTRICT" | "CASCADE" | "SET NULL" | "NO ACTION" | "SET DEFAULT";
    onUpdate?: "RESTRICT" | "CASCADE" | "SET NULL" | "NO ACTION" | "SET DEFAULT";
    orphanedRowAction?: "nullify" | "delete" | "soft-delete";
    primary?: boolean;
    persistence?: boolean;
    joinColumn?: boolean | JoinColumnOptions;
  }
)

```

1. 第一个参数（必选）
   传入目标实体类的引用（通常用箭头函数 type => TargetEntity），指定当前实体关联的 "多" 方实体类型。
   示例：@OneToMany(type => Comment, ...) 表示当前实体（如 Post）关联的是 Comment 实体。
2. 第二个参数（必选）
   传入箭头函数 target => target.property，指定目标实体中用于反向关联当前实体的属性名。
   作用是建立双向关联，让 TypeORM 知道 "多" 方实体如何指向 "一" 方实体。
3. 第三个参数（可选）

- cascade：级联操作，如 cascade: true 表示对当前实体操作时自动同步关联实体（新增 / 更新 / 删除）。
- lazy：是否延迟加载，lazy: true 时关联数据会在访问时才从数据库加载（返回 Promise）。
- eager：是否自动加载，eager: true 时查询当前实体会自动加载关联数据（与 lazy 互斥）。
- onDelete/onUpdate：数据库级联规则，如 onDelete: "CASCADE" 表示当 "一" 方实体删除时，关联的 "多" 方实体也会被删除。
- orphanedRowAction：当关联被移除时的处理方式，如 orphanedRowAction: "delete" 会删除被移除的关联实体。

### 常用命令

1. 在 TypeORM 中，@JoinColumn 装饰器用于指定数据库中关联关系的外键列，主要作用是明确两个实体之间建立关联时使用的外键字段，通常与 @ManyToOne 或 @OneToOne 配合使用（@OneToMany 一般不需要显式使用 @JoinColumn，因为外键在 "多" 的一方）。

### 自引用关系理解

```js
// 父菜单关联（多对一：多个子菜单可属于一个父菜单）
@ManyToOne(() => Menu, (menu) => menu.children) // 反向引用 children 字段
@JoinColumn({ name: 'parent_id' }) // 绑定到 parent_id 字段
parent: Menu // 父菜单对象
// 子菜单关联（一对多：一个父菜单可包含多个子菜单）
@OneToMany(() => Menu, (menu) => menu.parent, {
  // 反向引用 parent 字段（关键修复）
  cascade: true,
  eager: false
})
children: Menu[] // 子菜单数组
```

这段代码定义了一个自引用的菜单结构（同一个Menu实体既可以作为父菜单，也可以作为子菜单），通过@ManyToOne和@OneToMany实现了菜单间的父子层级关系。我们可以从 “双向关联” 和 “自引用特性” 两个角度来理解：

1. 核心目的：实现树形菜单结构
   菜单通常是层级化的（比如 “文件” 菜单下有 “新建”“打开” 等子菜单），这种结构需要用 “自引用关系” 实现 —— 即Menu实体自己关联自己，一个菜单可以有多个子菜单（一对多），同时一个子菜单只能属于一个父菜单（多对一）。
2. 逐行解析配置
   （1）子菜单关联父菜单：@ManyToOne 部分

   ```js
   @ManyToOne(() => Menu, (menu) => menu.children) // 反向引用 children 字段
   @JoinColumn({ name: 'parent_id' }) // 绑定到 parent_id 字段
   parent: Menu; // 父菜单对象
   个人理解：子菜单的parent指向menu.children, 因为是多的部分，多少要设置外键parent_id
   /*
    @ManyToOne(() => Menu, ...)：表示 “当前菜单（子菜单）” 与 “父菜单” 是多对一关系 —— 多个子菜单可以属于同一个父菜单。
    第一个参数() => Menu说明关联的目标实体还是Menu（自引用的关键：父菜单也是Menu类型）。
    (menu) => menu.children：反向关联的核心。
    意思是：“父菜单的children属性，就是由当前这些子菜单组成的”。
    这样就建立了双向关联：子菜单的parent指向父菜单，父菜单的children包含所有子菜单。
    @JoinColumn({ name: 'parent_id' })：指定数据库中存储父菜单 ID 的外键列名为parent_id。
    因为是自引用，这个外键列在Menu表中，直接指向同一张表的id（主键）。例如：
    父菜单的id=1，它的子菜单的parent_id都会设为1。
    顶级菜单（没有父菜单）的parent_id为null。
    parent: Menu：当前菜单的 “父菜单对象”（通过parent_id关联到的具体父菜单）。
   */
   ```

   （2）父菜单关联子菜单：@OneToMany 部分

   ```js
   @OneToMany(() => Menu, (menu) => menu.parent, {
   cascade: true,
   eager: false
   })
   children: Menu[]; // 子菜单数组
   个人理解：一个父菜单的children包含子菜单的标志指向父菜单的字段parent

   /*
    @OneToMany(() => Menu, ...)：表示 “当前菜单（父菜单）” 与 “子菜单” 是一对多关系 —— 一个父菜单可以有多个子菜单。
    第一个参数() => Menu同样说明子菜单也是Menu类型（自引用）。
    (menu) => menu.parent：双向关联的反向映射。
    意思是：“每个子菜单的parent属性，都指向当前这个父菜单”。
    这与前面@ManyToOne的(menu) => menu.children呼应，形成闭环：父菜单的children数组中的每个子菜单，其parent都指向该父菜单。
    配置项{ cascade: true, eager: false }：
    cascade: true：级联操作。例如，当保存父菜单时，会自动保存它的children数组中的子菜单（无需单独保存子菜单）；删除父菜单时，也会级联处理子菜单（具体行为取决于级联类型）。
    eager: false：关闭自动加载。查询父菜单时，不会自动查询它的子菜单（需手动通过relations指定加载），避免查询性能问题（尤其层级深时）。
    children: Menu[]：当前菜单的 “子菜单数组”（所有parent_id等于当前菜单id的子菜单）。
    */
   ```
